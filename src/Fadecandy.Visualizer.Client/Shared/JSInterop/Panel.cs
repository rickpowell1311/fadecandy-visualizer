using Microsoft.JSInterop;
using System.Linq;
using System.Threading.Tasks;

namespace Fadecandy.Visualizer.Client.Shared.JSInterop
{
    public static class Panel
    {
        public static async Task Listen()
        {
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
            // TODO: Json Deserialize 
            var data = json
                .Replace("[", string.Empty)
                .Replace("]", string.Empty)
                .Split(',')
                .Select(d => int.Parse(d))
                .ToArray();

            await Update(data);
        }
    }
}
