# xquery-dashboard-backend

This is a simple express-app server for verifying the signature sent from the xquery front-end. <br/>
When front-end tries to create new project, a sign message comes and it makes a signature.

![image](https://user-images.githubusercontent.com/100922076/183118080-13e3c476-4f68-4ebd-81c3-1f1ae1abb33a.png)

After click sign, front sends the signature to backend to verify. <br/>
The endpoint includes signature and wallet address as a query param. <br/>
When this back-end receives the request, it verifies to signature and wallet are compared to correct one. <br/>
Returns success when valid, otherwise fail. <br/>
If success, front-end goes to the next step - create project. <br/>

![image](https://user-images.githubusercontent.com/100922076/183118746-e90e4a98-da19-47cd-8d8b-6193d0a8d20e.png)
