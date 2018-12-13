using Serilog;
using System.Threading.Tasks;

namespace Fadecandy.Visualizer.Server.Logging
{
    public class SerilogWebsocketLogger : Websocket.Relay.ILogger
    {
        private readonly ILogger _logger;

        public SerilogWebsocketLogger()
        {
            _logger = new LoggerConfiguration().WriteTo
                .Console()
                .CreateLogger();
        }

        public async Task Info(string message)
        {
            await Task.Yield();
            _logger.Information(message);
        }
    }
}
