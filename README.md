# Software Engineering Assignment (CO3001)
This project is a website of printing service for student in VNU - Ho Chi Minh University of Technology (HCMUT). This is also the assignment in Software Engineering course (CO3001).
With our website, only student in HCMUT with their BkNetID account can log in.
For a quick demo of how the system works, check out the [YouTube video demo](https://www.youtube.com/watch?v=NZv7l3t2gFI).
## Team members
| No. | Full name                 | Student ID |
| :-: | --------------------------| :--------: |
| 1   | Trần Như Mai Anh           | 2210140    |
| 2   | Trương Bình Minh              | 2212088    |
| 3   | Trương Hoàng Nhật       | 2114303    |
| 4   | Võ Hoàng Huy       | 2211298    |
| 5   | Võ Phương Minh Nhật       | 2212413   |
| 6   | Võ Thanh Tâm       | 2213046    |

## This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
### FE:
Firstly, go to FE folder, install all dependencies:
```bash
npm i -f
```

Create an .env file inside FE folder. with following details:
``` bash
NEXT_PUBLIC_BACKEND_API_URL=""
NEXT_PUBLIC_ADMIN_USERNAME=""
NEXT_PUBLIC_ADMIN_PASSWORD=""
NEXT_PUBLIC_FILE_UPLOAD_API_URL=""
NEXT_PUBLIC_FILE_DOWNLOAD_API_URL=""
```
### Environment Variables Description

- **NEXT_PUBLIC_BACKEND_API_URL**:  
  Enter the base URL for your backend API.  
  - If running locally, use `http://localhost:8000`.  
  - For production, replace this with the live backend URL.

- **NEXT_PUBLIC_ADMIN_USERNAME**:  
  Enter the admin username.  
  - The default username for this project is `hcmut.spss`.  
  - Change this if your system uses a different admin account.

- **NEXT_PUBLIC_ADMIN_PASSWORD**:  
  Enter the admin password.  
  - The default password is `password`, but replace it with the appropriate password for your environment.

- **NEXT_PUBLIC_FILE_UPLOAD_API_URL**:  
  Enter the AWS API Gateway URL for file upload.  
  - This URL is provided by your AWS setup.  
  - Reach out to your AWS administrator if unsure.

- **NEXT_PUBLIC_FILE_DOWNLOAD_API_URL**:  
  Enter the AWS API Gateway URL for file download.  
  - This URL is also provided by your AWS setup.  
  - Consult your AWS administrator or project documentation for guidance.

Secondly, run the development server:

```bash
npm run dev
```

After done developing, shutdown dev environment by ```Ctrl + C``` and build then start the project:
```bash
npm run build
npm run start
```
### BE: 
We use fastAPI to get and post data. After run the server successfully, you can access http://localhost:8000/docs for document or test API.
**Steps to set up and run the backend:**

1. **Create a Database on Neon PostgreSQL**:  
   - Sign up or log in to [Neon PostgreSQL](https://neon.tech).  
   - Create a new database instance.  
   - Obtain the connection details (host, database name, user, password, and port).  

2. **Add Environment Variables in the `.env` File**:  
   Inside the `BE` folder, create a `.env` file with the following structure:

   ```bash
   DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>"
   ```
First, go to BE folder, install all dependencies:
```bash
pip install -r requirements.txt
```

Second, run the development server:

```bash
uvicorn main:app --reload
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Stacks Used
Next.js

Schema & validation: Zod: [Documentation](https://zod.dev/)

Form: react-hook-form [Documentation](https://react-hook-form.com/get-started)

For better understanding, try to look at libs/validation.ts, and components/form/SingIn.tsx.

For better UI components, you can use: https://ui.shadcn.com/docs

Database: PosgresSQL (Neon Serverless)

