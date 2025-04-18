YouLearn


YouLearn is an innovative web-based educational platform that enhances learning through YouTube videos. Users can sign up, log in, input video URLs, view embedded videos, access AI-generated summaries powered by Google Gemini, track their watch history, and interact with a Botpress chatbot for video-related queries. Built with a modern tech stack including React + TypeScript, Tailwind CSS, Node.js, Python, and MongoDB, 


Features





Authentication: Secure user signup and login with MongoDB and session management.



Video Embedding: Input YouTube URLs to embed and play videos directly on the platform.



AI Summaries: Generate concise summaries of video transcripts using Google Gemini’s free model.



Watch History: Track videos watched by each user, stored in MongoDB.



Chatbot: Interact with a Botpress-powered chatbot to ask questions about video content.



Landing Page: A responsive landing page styled with Tailwind CSS for user onboarding.

Tech Stack





Frontend: React, TypeScript, Tailwind CSS



Backend:





Node.js: Express for API routes (authentication, history, chatbot, summaries)



Python: youtube_transcript_api for transcript fetching



Database: MongoDB (Atlas, with users and history collections via Mongoose)



APIs:





Python youtube_transcript_api (transcript fetching)



Google Gemini API (summarization)



Botpress API (chatbot)



Tools: Postman (API testing), VS Code, Git
