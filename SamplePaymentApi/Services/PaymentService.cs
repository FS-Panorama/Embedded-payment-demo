using SamplePaymentApi.Models;
using System.Dynamic;

namespace SamplePaymentApi.Services;

public class PaymentService : IPaymentService
{
    public const string AuthApiUrl = "https://demo-auth.frontstream.com/api/"; // for production use: https://auth.frontstream.com/api/
    public async Task<Guid> StartEmbeddedSession(EmbeddedOptions options, string apiKey)
    {
        dynamic payload = new ExpandoObject();

        // There can only be one recurring donation in the transactions
        var recurringCount = 0;
        foreach (var x in options.PaymentLines)
        {
            if (x.Recurring.HasValue && x.Recurring.Value != 0) recurringCount++;
        }

        if (recurringCount > 0 &&
            (options.PaymentLines.Count() > 1))
        {
            throw new Exception("Cannot have more than 1 line item combined with recurring donations");
        }

        payload.ApiKey = apiKey;
        payload.EmbeddedOptions = options;

        var apiToken = SendToAuthenticationApi(HttpVerbs.Post, "Authenticate/StartEmbeddedSession",
            payload);

        var token = "";
        if (apiToken.Result.IsSuccessStatusCode)
        {
            token = await apiToken.Result.Content.ReadAsStringAsync();
            token = token.Trim('"');
        }

        return new Guid(token);
    }
    private async Task<HttpResponseMessage> SendToAuthenticationApi<T>(HttpVerbs httpType, string endpointSegment,
        T payload)
    {
        HttpResponseMessage apiResponse = null;

        Task.Run(async () =>
            apiResponse = await Extensions.SendToThirdPartyApi(httpType, AuthApiUrl, endpointSegment,
                payload, null, null)).Wait();

        return apiResponse;
    }

}