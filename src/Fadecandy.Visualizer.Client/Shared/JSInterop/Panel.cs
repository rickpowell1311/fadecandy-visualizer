using Microsoft.JSInterop;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Fadecandy.Visualizer.Client.Shared.JSInterop
{
    public static class Panel
    {
        public static DateTime LastReceivedOn { get; private set; }

        public static double MaxFps { get; private set; }

        public static bool ShouldThrottle => DateTime.UtcNow.Subtract(LastReceivedOn).TotalMilliseconds < (1d / MaxFps);

        static Panel()
        {
            MaxFps = 60;
        }

        public static async Task Listen(double maxFps = 60)
        {
            if (maxFps <= 0d)
            {
                throw new ArgumentException("Max frames per second must be greater than 0");
            }

            MaxFps = maxFps;

            await JSRuntime.Current.InvokeAsync<object>(
                "fadecandyVisualiser.listen");
        }

        public static async Task Configure(string elementId, int height, int width)
        {
            // TODO: Dynamic number of pixels

            await JSRuntime.Current.InvokeAsync<object>(
                "fadecandyVisualiser.configure", elementId, height, width, 5);
        }

        public static async Task Update(int[] data)
        {
            await JSRuntime.Current.InvokeAsync<int[]>(
                "fadecandyVisualiser.update", data);
        }

        [JSInvokable]
        public static async Task OnDataReceived(string json)
        {
            if (!ShouldThrottle)
            {
                // TODO: Json Deserialize 
                var data = json
                    .Replace("[", string.Empty)
                    .Replace("]", string.Empty)
                    .Split(',')
                    .Select(d => int.Parse(d))
                    .ToArray();

                await Update(data);
            }

            LastReceivedOn = DateTime.Now;
        }
    }
}
