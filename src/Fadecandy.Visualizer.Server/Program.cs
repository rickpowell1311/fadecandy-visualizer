using Fadecandy.Visualizer.Server.Logging;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Websocket.Relay;

namespace Fadecandy.Visualizer.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Run a websocket server
            var websocketRelay = Relay.Load(new SerilogWebsocketLogger(), RelayConfiguration.Default);
            websocketRelay.Run(7891, RunMode.Test);

            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseConfiguration(new ConfigurationBuilder()
                    .AddCommandLine(args)
                    .Build())
                .UseStartup<Startup>()
                .Build();
    }
}
