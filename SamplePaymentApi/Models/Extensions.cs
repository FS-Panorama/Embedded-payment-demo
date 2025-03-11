using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Net;
using System.Text;

namespace SamplePaymentApi.Models;

public class Extensions
{
    public static async Task<HttpResponseMessage> SendToThirdPartyApi<T>(HttpVerbs httpType, string apiUrl, string endpointSegment, T payload, Dictionary<string, string> extraHeaders = null, int? timeout = null)
    {
        using (var client = new HttpClient())
        {
            client.BaseAddress = new Uri(apiUrl);
            client.DefaultRequestHeaders.Accept.Clear();

            if (timeout != null)
            {
                client.Timeout = TimeSpan.FromMilliseconds(timeout.Value);
            }

            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls13 | SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;

            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            if (extraHeaders != null && extraHeaders.Count > 0)
            {
                foreach (var extraHeader in extraHeaders)
                {
                    client.DefaultRequestHeaders.Add(extraHeader.Key, extraHeader.Value);
                }
            }

            HttpResponseMessage apiResponse = null;
            switch (httpType)
            {
                case HttpVerbs.Get:
                    apiResponse = await client.GetAsync(endpointSegment);
                    break;
                case HttpVerbs.Post:
                    apiResponse = await client.PostAsync(endpointSegment, new StringContent(
                        JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json"));
                    break;
                case HttpVerbs.Put:
                    apiResponse = await client.PutAsync(endpointSegment, new StringContent(
                        JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json"));
                    break;
                case HttpVerbs.Delete:
                    apiResponse = await client.DeleteAsync(endpointSegment);
                    break;
            }

            return apiResponse;
        }
    }


}