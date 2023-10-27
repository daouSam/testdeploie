export class Notification {
      timeOut: 5000
      showProgressBar: true
      pauseOnHover: true
      clickToClose: true
      animate: 'fromRight'
      
  }
  
  export enum NotificationType {
    Success = "success",
    Error = "error",
    Alert = "alert",
    Info = "info",
    Warn = "warn",
    Bare = "bare"
  }