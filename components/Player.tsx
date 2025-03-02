"use client";

export function Player() {
  return (
    <section className="py-10 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-10">See How It Works</h2>
        <div className="relative max-w-4xl mx-auto rounded-lg shadow-2xl overflow-hidden">
          <div className="w-full" style={{ height: "500px" }}>
            {/* <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Email Generator Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe> */}
          </div>
        </div>
      </div>
    </section>
  );
}
