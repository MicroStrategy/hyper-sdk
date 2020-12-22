# Troubleshooting

- Why doesn't the copied card have the correct image displayed
![picture 4](./img/capture_issue.png)  
Answer: This might be due to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) restrictions. We suggest enabling [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for the resources to resolve this.
Read more about [Allowing cross-origin use of images and canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)



- Why does the SDK throw error: `Cannot ready property MEMORY_EXCEEDED` in the cosole?
Currently Hyper SDK enforces limitation of 500k keywords for matching, to avoid this error please:
  1. Use data sets with less keywords. 
  2. Or use pattern matching which doesn't have the 500k limitation, for more information read: [Known HyperIntelligence Limitations and Challenges in MicroStrategy 2020](https://community.microstrategy.com/s/article/Known-HyperIntelligence-Limitations-and-Challenges-in-MicroStrategy-2020?language=en_US)