This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
FE:
First, go to FE folder, install all dependencies:
```bash
npm i -f
```

Create an .env file inside FE folder. with following details:
``` bash
NEXT_PUBLIC_BACKEND_API_URL="http://localhost:8000"
NEXT_PUBLIC_ADMIN_USERNAME="hcmut.spss"
NEXT_PUBLIC_ADMIN_PASSWORD="password"
NEXT_PUBLIC_FILE_UPLOAD_API_URL="https://tyv91o1ov3.execute-api.ap-southeast-2.amazonaws.com/v1/filestoprint"
NEXT_PUBLIC_FILE_DOWNLOAD_API_URL="https://tyv91o1ov3.execute-api.ap-southeast-2.amazonaws.com/v1/filestoprint"
```

Second, run the development server:

```bash
npm run dev
```
BE: 
We use fastAPI to get and post data. After run the server successfully, you can access http://localhost:8000/docs for document or test API.
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

