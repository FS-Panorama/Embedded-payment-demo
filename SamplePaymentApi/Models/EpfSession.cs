namespace SamplePaymentApi.Models;

    public enum TransactionGroup
    {
        Donation = 1,
        AuctionItem = 3,
        Ticket = 4,
        Registration = 5,
        PaymentNoFee = 12
    }

    public enum RecurringTypes
    {
        Daily = 1,
        Weekly = 2,
        BiWeekly = 3,
        Monthly = 4,
        BiMonthly = 5,
        Quarterly = 6,
        SemiAnnually = 7,
        Annually = 8
    }

    public class PaymentLine
    {
        public decimal Amount { get; set; }
        public TransactionGroup Type { get; set; }
        public RecurringTypes? Recurring { get; set; }
    }

    public class EpfSession
    {
        // Required
        public required string IpAddress { get; set; }
        public required string RedirectUrl { get; set; }
        public required ICollection<PaymentLine> PaymentLines { get; set; }

        // Optional
        public int SelectedTheme { get; set; }
}