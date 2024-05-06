export declare enum RES_TYPES {
    CREATE = "Data Insert Successfully",
    UPDATE = "Data Update Successfully",
    DELETE = "Data deleted Successfully",
    USER_EXISTS = "User is already  exists!! Please use unique email",
    FETCH = "Data Fetch Successfully",
    ID_NOT_FOUND = "Id not found/Match",
    SELECT_NOT_FOUND = "Select not found/Match",
    LOGIN = "Congrats! You have Successfully logged in",
    AUTH_FAIL = "Authentication failed. Wrong Password or email",
    LOGOUT = "User Logged out Successfully",
    VALID_DATE = "Please Select Valid date",
    NOT_APPLY = "You Can Not Apply Leave at HoliDay",
    NOT_DELETE = "This Leave is Approved you can not delete it.",
    NOT_PERMISSION = "You do not have permission to access this route.",
    NO_FOUND = "This Data not found",
    ALREADY_LOGOUT = "User Have Already Logout",
    LOGOUT_FAIL = "logout Failed",
    UNIQUE = "This data is already stored Please give unique Email or userName",
    BAD_URL = "Bad Request URL not Found",
    UNIQUE_DATE = "You already assign for different task at this time",
    SOMETHING_WRONG = "Something went wrong !!! You try to insert single in bulk.",
    ACTIVE_YOUR_ACCOUNT = "First You have to active your account after you can access this route",
    INTIALROUTES_SUBCLASSES = "Subclasses must implement initializeRoutes method.",
    USER_NOT_FOUND = "User not found",
    OTP = "Sucessfully Send OTP",
    NOT_VALIDATE_OTP = "Invalid OTP Please Check",
    VALIDATE_OTP = "sucessfully verify OTP",
    INVALID_DATE = "End date must be greater than or equal to start date",
    DUPLICATEUSER = "User Already Exists",
    INVALID_TIME = "Clock-out time must be greater than clock-in time.",
    FILE_NOTFOUND = "File not found pls insert file",
    NOT_UPLOAD = "Error In Uploading",
    NO_MSG = "",
    UPLOADED = "Successfully Uploaded",
    BACKUP = " Error In Backup File ",
    NOT_FOUND_IMAGE = "Please provide image",
    VALUE_NULL = "Please provide profile completed by field ",
    NOT_VALID_ROLE = "please provide valid role",
    INVALID_NOTIFICATION_TYPE = "Please provide valid notification type",
    WRONG_PASSWORD = "Please correct old password",
    ENCRIPTIONS = " Error in encryption",
    DECOMPRESS = "Error in decompressing",
    WRONG_OTP = "Please provide valid otp"
}
export declare enum RES_STATUS {
    CREATE = "CREATE",
    DELETE = "DELETE",
    UPDATE = "UPDATE",
    GET = "GET"
}
export declare enum ROLES {
    USER = "0",
    SUPER_ADMIN = "1",
    OUTLET_ADMIN = "2"
}
export declare enum MODEL {
    USER = "userModel",
    COUNTRY = "countryModel",
    STATE = "stateModel",
    CITY = "cityModel",
    OUTLET = "outletModel",
    OTP = "otpModel"
}
export declare enum NotificationTypes {
    REMINDER = "reminder",
    FORGOT_PSW = "Forget Password",
    SEND_CREDENTIAL = "send_credential",
    ACTIVE_ACCOUNT = "active_account",
    SEND_PROFESSIONAL_SIGNUP_NOTIFICATION = "send_professional_signup_notification",
    SEND_UNREAD_CHAT_MESSAGE = "send_unread_chat_message"
}
