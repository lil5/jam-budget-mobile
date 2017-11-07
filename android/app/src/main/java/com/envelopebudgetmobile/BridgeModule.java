package com.envelopebudgetmobile.bridge;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BridgeModule extends ReactContextBaseJavaModule {
    // private static final String TAG = "Bridge";

    public BridgeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
      return "Bridge";
    }

    @ReactMethod
    public void getWorkingString(
        String str,
        Promise promise
    ) {
      promise.resolve(str);
    }
}
