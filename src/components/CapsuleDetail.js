import React from "react";

export default function CapsuleDetail({ capsule, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Capsule Details</p>
            <button
              onClick={onClose}
              className="modal-close p-2 hover:bg-gray-300 rounded-full cursor-pointer"
            >
              <svg
                className="fill-current text-gray-700 hover:text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L9 7.586l3.293-3.293a1 1 0 111.414 1.414L10.414 9l3.293 3.293a1 1 0 01-1.414 1.414L9 10.414l-3.293 3.293a1 1 0 01-1.414-1.414L7.586 9 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">
              Type: <span className="text-gray-600">{capsule.type}</span>
            </p>
            <p className="text-lg font-semibold">
              Serial: <span className="text-gray-600">{capsule.serial}</span>
            </p>
            <p className="text-lg font-semibold">
              Launches: <span className="text-gray-600">{capsule.launches.length}</span>
            </p>
            <p className="text-lg font-semibold">
              Land Landings: <span className="text-gray-600">{capsule.land_landings}</span>
            </p>
            <p className="text-lg font-semibold">
              Water Landings: <span className="text-gray-600">{capsule.water_landings}</span>
            </p>
            <p className="text-lg font-semibold">
              Reuse Count: <span className="text-gray-600">{capsule.reuse_count}</span>
            </p>
            <p className="text-lg font-semibold">
              Status:{" "}
              <span className={`text-${capsule.status === "active" ? "emerald" : "rose"}-500`}>
                {capsule.status}
              </span>
            </p>
            <p className="text-lg font-semibold">
              Last Update: <span className="text-gray-600">{capsule.last_update}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
