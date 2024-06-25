import React from 'react';

export default function SideBar() {
  return (
    <div>
      <div className='flex sm:flex-row md:flex-col w-[400px] gap-4'>
        <iframe height="315" src="https://www.youtube.com/embed/MOWthjWmS2s?si=jHeXPoYlkOJpssPh" title="YouTube video player" frameBorder="0" allow="autoplay;" allowFullScreen></iframe>
        <iframe height="315" src="https://www.youtube.com/embed/XY1zewz3A6M?si=r_21l0INv6XWXVeX" title="YouTube video player" frameBorder="0" allow="autoplay;" allowFullScreen></iframe>
        <iframe height="315" src="https://www.youtube.com/embed/wtEwJJMERPI?si=T4kzGp8XzdXpa6CD" title="YouTube video player" frameBorder="0" allow="autoplay;" allowFullScreen></iframe>
        <iframe height="315" src="https://www.youtube.com/embed/0I-G09vVmSA?si=K8IIIhY_it_9F2vx" title="YouTube video player" frameBorder="0" allow="autoplay" allowFullScreen></iframe>
      </div>
    </div>
  );
}

