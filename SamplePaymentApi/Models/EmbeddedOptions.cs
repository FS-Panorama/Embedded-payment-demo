using System.ComponentModel.DataAnnotations;

namespace SamplePaymentApi.Models;

public class EmbeddedOptions
{
    // Required
    public required string IpAddress { get; set; }
    public required string RedirectUrl { get; set; }
    [Required] public required ICollection<PaymentLine> PaymentLines { get; set; }

    // Optional
    public string? PoweredByText { get; set; }
    public string? PoweredByUrl { get; set; }
    public string? DefaultCountryCode { get; set; }
    public bool ShowPayTheFee { get; set; }
    public string? PayTheFeeText { get; set; }
    public string? DonateButtonText { get; set; }
    public string? Language { get; set; }
    public string? Theme { get; set; }
    public List<string>? ThemeFonts { get; set; }
    public string? EventId { get; set; }

}