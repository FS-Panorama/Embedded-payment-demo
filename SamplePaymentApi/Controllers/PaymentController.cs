using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SamplePaymentApi.Models;
using SamplePaymentApi.Services;
using System.Net;

namespace SamplePaymentApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController(IPaymentService paymentService, ILogger<PaymentController> logger) : ControllerBase
    {
        public const string apiKey = "E6836688-B5FF-48A3-A628-289C4FC4A5F7"; // demo key

        /// <summary>
        /// Create an embedded session token for the iframe to use
        /// </summary>
        /// <param name="initConfig"></param>
        /// <returns></returns>
        [HttpPost]
        [EnableCors]
        [Route("api/EmbeddedSession")]
        public IActionResult EmbeddedSession(EpfSession initConfig)
        {
            Object response;
            EmbeddedOptions options;

            try
            {
                options = new EmbeddedOptions()
                {
                    IpAddress = initConfig.IpAddress,
                    RedirectUrl = initConfig.RedirectUrl,
                    PaymentLines = initConfig.PaymentLines,
                };

                // optional
                switch (initConfig.SelectedTheme)
                {
                    case 1: // pink theme
                        options.Theme = ".p-card-title{ color: rgb(0, 0, 0) !important; font-family: Open Sans !important}.EPF__body{ background-color: rgb(221, 183, 183); } .card {background: transparent !important;} .p-card{background: transparent !important;} .surface-card{background: transparent !important;}.p-card-title{ color: rgb(0, 0, 0) !important; font-family: Open Sans !important}.EPF__subheading__text{ color: rgb(0, 0, 0) !important; font-family: Open Sans !important}.EPF__body__text,.p-field-checkbox,.p-steps .p-steps-item .p-steps-title{ color: rgb(0, 0, 0) !important; font-family: Open Sans !important}.p-button-label{color:rgb(255, 255, 255) !important; font-family:Roboto;}.p-button{background-color:rgb(51, 122, 183) !important;border-radius:25px;border-color: transparent !important;}.p-button:hover{background-color:rgb(51, 122, 183) !important;}.p-button-label:hover{color:rgb(255, 255, 255) !important}.gpay-card-info-container{border-radius:25px!important;}.EPF__link__text{ color: rgb(0, 119, 173) !important; font-family: Open Sans !important}.EPF__form-element, .p-dropdown{ border-radius: 0.375rem !important; }.p-steps .p-steps-item.p-highlight .p-steps-number{background: rgb(51, 122, 183) !important;}.epf-cc {color: rgb(0, 0, 0) !important;}.epf-cc-selected {color: rgb(51, 122, 183) !important;}.p-button {color: rgb(255, 255, 255) !important;}.EPF__form-element:focus{color: #495057; -webkit-box-shadow: none !important; box-shadow:none !important; background-color: #FFFFFF !important; border-color: #4A4A4A !important;}.EPF_form-element--error{ -webkit-box-shadow: none !important; box-shadow:none !important;  background-color: #F6CCD1 !important; border-color: #DC143C !important;}.EPF_form-element--error:focus{background-color: #F6CCD1 !important;}.has-error .input-group-addon { background-color: #F6CCD1 !important }.select--error { background: #F6CCD1 }.select--error ~ .fa-angle-down { display:none }.select--error:focus ~ .fa-angle-down { display: inline }.select--error:focus ~ .fa-exclamation-circle { display: none}.select--error:focus { background-color: #F6CCD1 }.exclamation-textArea { padding-top: 3.75rem }.form-field--invalid {border-color: #d0021b !important;}.form-field--invalid .p-dropdown {border-color: #d0021b !important;}";
                        options.ThemeFonts = [
                            "Open Sans:400,500,600,700 ",
                            "Roboto:400, 700 "
                        ];
                        break;

                    case 2: // green theme
                        options.Theme = ".p-card-title{ color: rgb(125, 137, 32) !important; font-family: Open Sans !important}.EPF__body{ background-color: rgb(255, 255, 255); } .card {background: transparent !important;} .p-card{background: transparent !important;} .surface-card{background: transparent !important;}.p-card-title{ color: rgb(125, 137, 32) !important; font-family: Open Sans !important}.EPF__subheading__text{ color: rgb(90, 118, 8) !important; font-family: Open Sans !important}.EPF__body__text,.p-field-checkbox,.p-steps .p-steps-item .p-steps-title{ color: rgb(164, 187, 95) !important; font-family: Open Sans !important}.p-button-label{color:rgb(255, 255, 255) !important; font-family:ABeeZee;}.p-button{background-color:rgb(125, 137, 32) !important;border-radius:0px;border-color: transparent !important;}.p-button:hover{background-color:rgb(219, 189, 138) !important;}.p-button-label:hover{color:rgb(230, 230, 230) !important}.gpay-card-info-container{border-radius:0px!important;}.EPF__link__text{ color: rgb(0, 119, 173) !important; font-family: Open Sans !important}.EPF__form-element, .p-dropdown{ border-radius: 0.375rem !important; }.p-steps .p-steps-item.p-highlight .p-steps-number{background: rgb(125, 137, 32) !important;}.epf-cc {color: rgb(164, 187, 95) !important;}.epf-cc-selected {color: rgb(125, 137, 32) !important;}.p-button {color: rgb(255, 255, 255) !important;}.EPF__form-element:focus{color: #495057; -webkit-box-shadow: none !important; box-shadow:none !important; background-color: #FFFFFF !important; border-color: #4A4A4A !important;}.EPF_form-element--error{ -webkit-box-shadow: none !important; box-shadow:none !important;  background-color: #F6CCD1 !important; border-color: #DC143C !important;}.EPF_form-element--error:focus{background-color: #F6CCD1 !important;}.has-error .input-group-addon { background-color: #F6CCD1 !important }.select--error { background: #F6CCD1 }.select--error ~ .fa-angle-down { display:none }.select--error:focus ~ .fa-angle-down { display: inline }.select--error:focus ~ .fa-exclamation-circle { display: none}.select--error:focus { background-color: #F6CCD1 }.exclamation-textArea { padding-top: 3.75rem }.form-field--invalid {border-color: #d0021b !important;}.form-field--invalid .p-dropdown {border-color: #d0021b !important;}}";
                        options.ThemeFonts = [
                            "Open Sans:400,500,600,700 ",
                            "ABeeZee:400, 700 "
                        ];
                        break;

                    case 3: // dark theme
                        options.Theme = ".p-card-title{ color: rgb(255, 255, 255) !important; font-family: Open Sans !important}.EPF__body{ background-color: rgb(8,6,105); } .card {background: transparent !important;} .p-card{background: transparent !important;} .surface-card{background: transparent !important;}.p-card-title{ color: rgb(255, 255, 255) !important; font-family: Open Sans !important}.EPF__subheading__text{ color: rgb(255, 255, 255) !important; font-family: Open Sans !important}.EPF__body__text,.p-field-checkbox,.p-steps .p-steps-item .p-steps-title{ color: rgb(251, 251, 251) !important; font-family: Open Sans !important}.p-button-label{color:rgb(8, 6, 105) !important; font-family:Roboto;}.p-button{background-color:rgb(251, 251, 251) !important;border-radius:25px;border-color: transparent !important;}.p-button:hover{background-color:rgb(141, 174, 203) !important;}.p-button-label:hover{color:rgb(255, 255, 255) !important}.gpay-card-info-container{border-radius:25px!important;}.EPF__link__text{ color: rgb(0, 119, 173) !important; font-family: Open Sans !important}.EPF__form-element, .p-dropdown{ border-radius: 0.375rem !important; }.p-steps .p-steps-item.p-highlight .p-steps-number{background: rgb(251, 251, 251) !important;}.epf-cc {color: rgb(251, 251, 251) !important;}.epf-cc-selected {color: rgb(251, 251, 251) !important;}.p-button {color: rgb(8, 6, 105) !important;}.EPF__form-element:focus{color: #495057; -webkit-box-shadow: none !important; box-shadow:none !important; background-color: #FFFFFF !important; border-color: #4A4A4A !important;}.EPF_form-element--error{ -webkit-box-shadow: none !important; box-shadow:none !important;  background-color: #F6CCD1 !important; border-color: #DC143C !important;}.EPF_form-element--error:focus{background-color: #F6CCD1 !important;}.has-error .input-group-addon { background-color: #F6CCD1 !important }.select--error { background: #F6CCD1 }.select--error ~ .fa-angle-down { display:none }.select--error:focus ~ .fa-angle-down { display: inline }.select--error:focus ~ .fa-exclamation-circle { display: none}.select--error:focus { background-color: #F6CCD1 }.exclamation-textArea { padding-top: 3.75rem }.form-field--invalid {border-color: #d0021b !important;}.form-field--invalid .p-dropdown {border-color: #d0021b !important;}";
                        options.ThemeFonts = [
                            "Open Sans:400,500,600,700 ",
                            "Roboto:400, 700 "
                        ];
                        break;
                    default:
                        options.Theme = "";
                        options.ThemeFonts = null;
                        break;
                }

                // optional settings
                options.ShowPayTheFee = true;
                options.PayTheFeeText = "Cover the fee";
                options.PoweredByText = "Demo Company";
                options.PoweredByUrl = "https://example.com/";
                options.DonateButtonText = "Submit Payment";

                response = paymentService.StartEmbeddedSession(options, apiKey);
            }
            catch (Exception ex)
            {
                logger.Log(LogLevel.Error,$"Embedded Session Error: {ex.Message}");
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }

            logger.Log(LogLevel.Information, $"Embedded Session Response: {response}");

            return Ok(response);
        }
    }
}
