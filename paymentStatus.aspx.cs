using System;
using System.Web.UI;

public partial class PaymentStatus : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string status = Request.QueryString["status"];
            string address = Request.QueryString["address"];
            string amount = Request.QueryString["amount"];
            string hash = Request.QueryString["hash"];

            if (status == "success")
            {
                statusMessage.InnerHtml = "Payment Successful!";
                statusMessage.Attributes.Add("class", "text-success");
                transactionHash.InnerHtml = $"Transaction Hash: {hash}";
            }
            else
            {
                statusMessage.InnerHtml = "Payment Failed!";
                statusMessage.Attributes.Add("class", "text-danger");
            }

            address.InnerHtml = $"Payee's Wallet Address: {address}";
            amount.InnerHtml = $"Amount Sent: {amount}";
        }
    }
}
