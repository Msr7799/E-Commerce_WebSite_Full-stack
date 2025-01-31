import React from 'react';

const AboutMePage = () => {
  return (
    <div className='container mt-42 mx-auto px-4 mt-40 py-10'>
      <div className='max-w-3xl mx-auto text-black bg-white shadow-lg rounded-lg p-6'>
        <h1 className='text-3xl font-bold mb-4 text-center'>About Me</h1>

        {/* My profile picture */}
        <div className='flex justify-center'>
          <div style={{ position: 'relative', width: '100%', height: 0, paddingTop: '56.25%', paddingBottom: 0, boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', marginTop: '1.6em', marginBottom: '0.9em', overflow: 'hidden', borderRadius: '8px', willChange: 'transform' }}>
            <iframe
              loading="lazy"
              style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
              src="https://www.canva.com/design/DAGdv-QtF0g/svUF7YVOIFS9m2GO5yVnwA/view?embed"
              allowfullscreen="allowfullscreen"
              allow="fullscreen"
              title="Mohamed Saud Alromaihi's Profile Picture"
            />
          </div>
        </div>

        <div className='text-center mb-4'>
          <h2 className='text-2xl font-bold'>MOHAMED SAUD ALROMAIHI</h2>
          <p>
            <strong>Contact:</strong> alromaihi2224@gmail.com | 37925259 | msr7799
          </p>
        </div>

        <div className='mb-4'>
          <h3 className='text-xl font-bold'>Profile</h3>
          <p>
            A military leader and cybersecurity Technician (CCT) and Full-Stack Developer with expertise in securing networks and coding using HTML, CSS, JavaScript, React, Next.js, Python, and more. As a former officer with the rank of Captain, I bring strong leadership skills, discipline, and a commitment to teamwork. I thrive in delivering high-quality results with precision and efficiency, ensuring tasks are completed to the required standard. You are most welcome to visit my GitHub page and see some of my work!
          </p>
        </div>

        <div className='mb-4'>
          <h3 className='text-xl font-bold'>Skills</h3>
          <ul className='list-disc list-inside mt-2'>
            <li>Flexibility</li>
            <li>Effective communication</li>
            <li>Strong organizational skills</li>
            <li>Fast learner</li>
            <li>Hard worker</li>
            <li>Leadership</li>
            <li>Teamwork</li>
          </ul>
        </div>

        <div className='mb-4'>
          <h3 className='text-xl font-bold'>Development Skills</h3>
          <ul className='list-disc list-inside mt-2'>
            <li>Full-Stack Development: HTML, CSS, JavaScript, React, Next.js, Python</li>
            <li>Web Design and responsive UI/UX</li>
            <li>Git version control and GitHub collaboration</li>
            <li>API integration and development</li>
            <li>Database management (SQL, NoSQL)</li>
            <li>Strong problem-solving and optimization</li>
            <li>Knowledge of cybersecurity principles</li>
            <li>Continuous learning and adaptability</li>
          </ul>
        </div>

        <div className='mb-4'>
          <h3 className='text-xl font-bold'>Languages</h3>
          <ul className='list-disc list-inside mt-2'>
            <li>Arabic</li>
            <li>English</li>
          </ul>
        </div>

        <div className='mb-4'>
          <h3 className='text-xl font-bold'>Education</h3>
          <ul className='list-disc list-inside mt-2'>
            <li>Diploma in Military Sciences, Royal Military College of Isa (Sep 2005 - Jun 2007)</li>
            <li>Secondary School General Certificate (Science), East Riffa Secondary Boys School (2024)</li>
            <li>Cybersecurity Technical, Procloud Institute, Manama</li>
            <li>Cybersecurity Technician (CCT)</li>
          </ul>
        </div>

        <div className='mb-4'>
          <h3 className='text-xl font-bold'>Employment</h3>
          <ul className='list-disc list-inside mt-2'>
            <li>Officer in Bahrain Defense Force (Aug 2007 - Feb 2019)</li>
            <li>Captain, Bahrain (11 years)</li>
            <li>Commander with leading education and prepared to lead</li>
            <li>Manager of maintenance and technical supplement (3 years)</li>
            <li>Manager of warehouses for military clothes and equipment (2 years)</li>
          </ul>
        </div>

        <div className='mt-4 text-center'>
          <a
            href='https://www.canva.com/design/DAGdXXESxG4/3xIoFIjEWaBfEGegdvKxnQ/view?utm_content=DAGdXXESxG4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf6d06144af'
            className='inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            target='_blank'
            rel='noopener noreferrer'
          >
            Download My Resume
          </a>
        </div>

        <div className='mt-4 text-center'>
          <a
            href='https://e-commerce-website-full-stack.onrender.com'
            className='inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            target='_blank'
            rel='noopener noreferrer'
          >
            Visit My E-Commerce Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;