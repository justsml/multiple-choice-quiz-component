import React, { Component } from 'react';
import { render } from 'react-dom';
import Challenge from './Challenge';
import './style.css';

function App() {
  return (
    <div class='quiz'>
      <header>
        <h1>Promise & Function Syntax</h1>
        <span class='challenge-label'>&nbsp; quiz &nbsp;</span>
      </header>
      <section>
        <Challenge 
          title={'Promise Basics 1/5'} 
          description={`### What type does \`getCustomers()\` return?
  \`\`\`js
  const dummyData = []
  function getCustomers() {
    return Promise.resolve(dummyData)
  }
  \`\`\`
          `}
          options={[
            `Customer Data`,
            `Array`,
            `Promise`
          ]} 
          answer={`Promise`} 
        />
        <Challenge 
          title={'Promise Basics 2/5'} 
          description={`### What type does \`getCustomers()\` return?
  \`\`\`js
  const dummyData = []
  const getCustomers = () => Promise.resolve(dummyData)
  \`\`\`
          `}
          options={[
            `Customer Data`,
            `Array`,
            `Promise`
          ]} 
          answer={`Promise`} 
        />
      </section>
    </div>
  );
}


render(<App />, document.getElementById('root'));
