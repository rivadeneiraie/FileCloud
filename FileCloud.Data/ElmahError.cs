using System;

namespace FileCloud.Data
{
    public class ElmahError
    {
        public Guid ErrorId { get; set; }
        public string Application { get; set; } = string.Empty;
        public string Host { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Source { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string User { get; set; } = string.Empty;
        public int StatusCode { get; set; }
        public DateTime TimeUtc { get; set; }
        public int Sequence { get; set; }
        public string AllXml { get; set; } = string.Empty;
    }
}
