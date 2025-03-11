using SamplePaymentApi.Models;

namespace SamplePaymentApi.Services;

public interface IPaymentService
{
    Task<Guid> StartEmbeddedSession(EmbeddedOptions options, string apiKey);
}