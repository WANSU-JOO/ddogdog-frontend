export {}

declare global {
  interface KakaoAuthResponse {
    access_token: string
    refresh_token?: string
    scope?: string
    token_type?: string
    expires_in?: number
  }

  interface KakaoError {
    error: string
    error_description?: string
  }

  interface Window {
    Kakao: {
      init: (appKey: string) => void
      isInitialized: () => boolean
      Auth: {
        login: (options: {
          scope?: string
          success: (authObj: KakaoAuthResponse) => void
          fail?: (err: KakaoError) => void
        }) => void
        authorize: (options: { redirectUri: string; scope?: string }) => void
        getAccessToken: () => string | null
        logout: (callback?: () => void) => void
      }
      API: {
        request: (options: {
          url: string
          success: (response: unknown) => void
          fail?: (error: KakaoError) => void
        }) => void
      }
    }
  }
}
