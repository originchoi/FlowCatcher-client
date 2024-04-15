function MobileAcess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-red-500 mb-2">
          Service Unavailable 😭
        </h1>
        <p className="text-lg text-gray-700">
          The FlowCatcher service is not available on mobile devices.
          <br />
          Please visit us on a desktop browser. Thank you for your
          understanding!
        </p>
        <div className="mt-4">
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default MobileAcess;
