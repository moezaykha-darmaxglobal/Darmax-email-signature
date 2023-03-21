import React, { useState, useRef } from 'react';
import {storage} from './firebase';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";
import './form.css'
import guideimg from '../guide1.png'

function GeneratorForm() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [copied, setCopied] = useState(false);

  const htmlRef = useRef(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGreetingChange = (e) => {
    setGreeting(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const imageRef = ref(storage, `image/${image.name + v4()}`)
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // Here you can monitor the upload progress if needed
        // For example, you can show a progress bar or update a percentage
      },
      (error) => {
        console.error('Error uploading image:', error);
      },
      () => {
        // Get the download URL of the uploaded image
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // Generate the HTML tag with the input values and image URL
          const html = `<p>${greeting}</p><img width="300" height="200" src="${url}" alt="${name}" /><p>${name}</p>`;
          console.log(html);
          setHtmlCode(html);
          // Set the image URL state
          setImageUrl(url);
        });
      }
    );
  };

  const handleCopyClick = () => {
    const htmlDiv = document.querySelector("#generated-html");
   
    if (htmlDiv) {
      const htmlCode = htmlDiv.innerHTML;
      const parser = new DOMParser();
      const decodedHtml = parser.parseFromString(htmlCode, "text/html").documentElement.textContent;
      navigator.clipboard.writeText(decodedHtml);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 8000);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
     

      <label htmlFor="greeting">Greeting:</label>
      <input type="text" id="greeting" name="greeting" value={greeting} onChange={handleGreetingChange} />

      <label htmlFor="image">Signature Image: <small>preferably with white background</small></label>
      <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
      

      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />

      <button type="submit">Generate HTML</button>

      {imageUrl && (
        <div>
          <p>Display:</p>
          <div dangerouslySetInnerHTML={{ __html: htmlCode }}></div>
          <pre id="generated-html" >{`<p>${greeting}</p><img width="200" height="100" src="${imageUrl}" alt="${name}" /><p>${name}</p>`}</pre>
          
          {/* <div dangerouslySetInnerHTML={{ __html: `<p>${greeting}</p><img src="${imageUrl}" alt="${name}" /><p>${name}</p>` }}></div> */}
          <button type="button" onClick={handleCopyClick}>
            {copied ? 'Copied!' : 'Copy HTML'}
          </button>

          <div>
            <p>Guide:</p>
            <p>paste the code in the textarea after pressing "source"</p>
            <img src={guideimg} alt="" width="400" height="300"/>
            <p>After pasting code press the "source" again to see output</p>
          </div>
        </div>
      )}
    </form>
  );
}

export default GeneratorForm;