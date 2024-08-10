<%@ Page Language="C#" AutoEventWireup="true" CodeFile="paymentStatus.aspx.cs"
Inherits="PaymentStatus" %>

<!DOCTYPE html>
<html lang="en">
  <head runat="server">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payment Status</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.0-beta3/css/bootstrap.min.css"
    />
    <style>
      body {
        background-color: #f8f9fa;
        padding-top: 50px;
      }
      .container {
        max-width: 600px;
      }
    </style>
  </head>
  <body>
    <form id="form1" runat="server">
      <div class="container text-center">
        <h1 id="statusMessage" class="mb-5" runat="server"></h1>
        <p id="address" runat="server"></p>
        <p id="amount" runat="server"></p>
        <p id="transactionHash" runat="server"></p>
        <a href="index.html" class="btn btn-primary mt-3">Go Back</a>
      </div>
    </form>

    <script>
      function getQueryParams() {
        const params = {};
        const queryString = window.location.search.slice(1);
        const pairs = queryString.split("&");
        pairs.forEach((pair) => {
          const [key, value] = pair.split("=");
          params[key] = decodeURIComponent(value || "");
        });
        return params;
      }

      document.addEventListener("DOMContentLoaded", () => {
        const params = getQueryParams();
        const statusMessage = document.getElementById(
          "<%= statusMessage.ClientID %>"
        );
        const address = document.getElementById("<%= address.ClientID %>");
        const amount = document.getElementById("<%= amount.ClientID %>");
        const transactionHash = document.getElementById(
          "<%= transactionHash.ClientID %>"
        );

        if (params.status === "success") {
          statusMessage.textContent = "Payment Successful!";
          statusMessage.classList.add("text-success");
          transactionHash.textContent = `Transaction Hash: ${params.hash}`;
        } else {
          statusMessage.textContent = "Payment Failed!";
          statusMessage.classList.add("text-danger");
        }

        address.textContent = `Payee's Wallet Address: ${params.address}`;
        amount.textContent = `Amount Sent: ${params.amount}`;
      });
    </script>
  </body>
</html>
