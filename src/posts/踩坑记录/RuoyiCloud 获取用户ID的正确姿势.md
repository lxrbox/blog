---
title: RuoyiCloud 获取用户ID的正确姿势
tags:
  - 踩坑日记
icon: check-circle
---
## 核心结论

  **网关放行的接口必须使用 `TokenService.getLoginUser()`，不能使用 `SecurityUtils.getUserId()`。**  

---

## 一、正确的使用方式  

```java

@RestController

@RequestMapping("/robotCatalog/external/popup")

@RequiredArgsConstructor

public class PopupExternalController {

private final TokenService tokenService;

@GetMapping("/next")

public MyAjaxResult<PopupNextVO> getNextPopup(

@RequestHeader(value = "X-Anon-Id", required = false) String anonId) {

// ✅ 正确：使用 TokenService 从 Redis 获取用户信息

LoginUser loginUser = tokenService.getLoginUser();

Long userId = loginUser != null ? loginUser.getUserid() : null;

PopupNextRequest request = PopupNextRequest.builder()

.userId(userId != null && userId > 0 ? userId : null)

.anonId(anonId) // 未登录用户使用匿名ID

.build();

return MyAjaxResult.success(popupCardService.getNextPopup(request));

}

}

```

  

**关键点：**

- 注入 `TokenService`

- 调用 `tokenService.getLoginUser()` 获取完整的 `LoginUser` 对象

- 判断 `loginUser` 是否为 `null`（未登录返回 null）

- 支持匿名访问场景


---

  

## 二、错误的使用方式

  

```java

@RestController

@RequestMapping("/robotCatalog/external/popup")

public class PopupExternalController {

@GetMapping("/next")

public MyAjaxResult<PopupNextVO> getNextPopup(...) {

// ❌ 错误：网关放行后，永远返回 0L

Long userId = SecurityUtils.getUserId();

PopupNextRequest request = PopupNextRequest.builder()

.userId(userId) // 所有用户都被当作 userId=0

.build();

return MyAjaxResult.success(popupCardService.getNextPopup(request));

}

}

```

  

**问题表现：**

- 已登录用户：返回 `0L`（而不是真实的用户ID）

- 未登录用户：返回 `0L`

- 无法区分登录和未登录状态

- 业务逻辑错误：所有用户都被当作 `userId=0` 处理

  

---

  

## 三、为什么会这样？

  

### 问题根源：网关放行 + 请求头缺失 + 兜底机制

  

#### 1. SecurityUtils 依赖请求头

  

**正常流程（网关认证）：**

```

前端请求 → 网关验证token → 网关解析用户信息 → 添加到请求头(user-id)

→ 后端服务 → HeaderInterceptor提取请求头 → 存入ThreadLocal

→ SecurityUtils.getUserId() 返回真实ID ✅

```

  

**网关放行流程：**

```

前端请求 → 网关直接放行（跳过认证） → 请求头为空

→ 后端服务 → HeaderInterceptor提取不到 → ThreadLocal为空

→ SecurityUtils.getUserId() 返回兜底值 0L ❌

```

  

**核心代码：**

```java

// SecurityContextHolder.java

public static Long getUserId() {

// 从ThreadLocal获取，如果为空，返回兜底值 0L

return Convert.toLong(get(SecurityConstants.DETAILS_USER_ID), 0L);

// ↑

// 兜底值：0L

}

```

  

#### 2. RuoyiCloud 的兜底机制

  

RuoyiCloud 为了避免空指针异常，在 `SecurityContextHolder.getUserId()` 中设置了兜底值 `0L`。

  

**设计初衷：** 避免 NPE

**副作用：** 网关放行时，无法区分"未登录"和"系统错误"

  

#### 3. TokenService 不依赖网关

  

**TokenService 工作流程：**

```

前端请求（携带 Authorization: Bearer xxx）

↓

TokenService.getLoginUser()

↓

从 Authorization Header 提取 token

↓

JWT 解析 token 获取 userKey

↓

从 Redis 缓存读取 LoginUser 对象

↓

返回 LoginUser（或 null）✅

```

  

**核心代码：**

```java

@Component

public class TokenService {

public LoginUser getLoginUser(HttpServletRequest request) {

String token = SecurityUtils.getToken(request);

if (StringUtils.isEmpty(token)) {

return null; // 未登录返回 null，而不是 0

}

String userkey = JwtUtils.getUserKey(token);

return redisService.getCacheObject(getTokenKey(userkey));

}

}

```

  

**优势：**

- 不依赖网关设置的请求头

- 直接从 Redis 获取，数据可靠

- 未登录返回 `null`，可以明确区分状态

  

---



## 四、使用规范

### 什么时候用 TokenService？

- ✅ 接口路径包含 `/external/`

- ✅ 网关配置中放行该路径

- ✅ 需要支持匿名访问

- ✅ 需要区分登录和未登录状态

### 什么时候用 SecurityUtils？

- ✅ 内部服务调用（经过网关认证）

- ✅ 使用 `@PreAuthorize` 等权限注解

- ✅ 只有登录用户才能访问


```

是否是网关放行的接口？

│

├─ 是 → 使用 TokenService ✅

│

└─ 否 → 使用 SecurityUtils ✅

```



