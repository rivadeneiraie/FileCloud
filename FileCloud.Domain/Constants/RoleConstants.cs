namespace FileCloud.Domain.Constants
{
    public static class RoleConstants
    {
        public const string AdminUserCreate = "ADMIN.USER_CREATE";
        public const string AdminUserUpdate = "ADMIN.USER_UPDATE";
        public const string AdminUserDelete = "ADMIN.USER_DELETE";
        public const string UserFileUpload = "USER.FILE_UPLOAD";
        public const string UserFileDownload = "USER.FILE_DOWNLOAD";
        public const string UserFileDelete = "USER.FILE_DELETE";
        public const string UserSharedFileCreate = "USER.SHAREDFILE_CREATE";
        public const string UserSharedFileRevoke = "USER.SHAREDFILE_REVOKE";
    }
}