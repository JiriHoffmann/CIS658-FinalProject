import React from "react";

const About = () => {
  return (
    <>
      <div className="w-screen h-screen bg-gray-400 fixed top-0 z-0" />
      <div className="relative content-center flex-col pt-24 pb-12 z-5">
        <div className="bg-white mb-10 rounded-lg w-11/12 max-w-3xl shadow-lg mt-8 px-12 pt-12 font-bold text-lg flex flex-col mx-auto z-8">
          <div className="text-2xl pb-6 w-full">What?</div>
          <div className="pb-4">
            This website was created with the idea to make it as easy as
            possible to share local deals on groceries. There are many groups on
            Facebook and Reddit but there is no easy tool that allows you to
            just simply look it up.
          </div>
          <div className="pb-8">
            Here it's easy to find the city you live in and filter out specific
            types of groceries might be looking for.
          </div>
          <div className="text-2xl pb-4 w-full">How?</div>
          <div className="pb-8">
            It's super simple! Just click on the feed button to look at deals or
            log in to share them.
          </div>
          <div className="text-2xl pb-4 w-full">Developers</div>
          <div className="pb-2">
            Developers can also access the 10 newest items on the feed by using
            GET on
          </div>
          <div className="mb-8 bg-gray-700 text-white text-center rounded py-1">
            https://us-central1-cis658-finalproject.cloudfunctions.net/app/api
          </div>
          <div className="text-2xl pb-2 w-full">Made with</div>
          <ul className="mb-12">
            <li>• React</li>
            <li>• Google Firebase</li>
            <li>• Tailwind CSS</li>
            <li>• Font Awesome icons</li>
            <li>• Ionicons</li>
            <li>• Material Design icons</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export { About };
