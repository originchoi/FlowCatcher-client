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
      </div>
    </div>
  );
}

export default MobileAcess;
