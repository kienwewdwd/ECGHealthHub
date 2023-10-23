// import axios from 'axios';

// const apiKey = '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';
// const instance = axios.create({
//   baseURL: 'https://api.openai.com/v1/chat/completions',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${apiKey}`
//   }
// });

// export const generateResponse = async (message: any) => {
//   try {
//     const response = await instance.post('', {
//       prompt: message,
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           "role": "user",
//           "content": ""
//         }
//       ],
//       temperature: 1,
//       max_tokens: 256,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//     });
//     return response.data.choices[0].text;
//   } catch (error) {
//     console.error(error);
//     return '';
//   }
// };

