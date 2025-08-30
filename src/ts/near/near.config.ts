// near.config
const result = near.config({ networkId: "mainnet" });
console.log('near.config({ networkId: "mainnet" }) =>', result);

// Runtime Safety + Console Log
if (typeof near === "undefined") {
    throw new Error("Global 'near' object is not available");
  } else {
    console.log("✅ Global 'near' object is available and ready to use.");
  }