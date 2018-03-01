
package com.custommodule;

import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Nullable;

public class CustomModuleModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private boolean hasListening;
    private Handler handler;
    private int delay = 500;

    public CustomModuleModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.handler = new Handler(Looper.getMainLooper());
    }

    @Override
    public String getName() {
        return "CustomModule";
    }

    @ReactMethod
    public void startListening() {
        hasListening = true;
        attachBasicListener();
    }

    @ReactMethod
    public void getModuleList(final Callback callback) {
        try {
            WritableArray list = getList();
            callback.invoke(null, list);
        } catch (Exception ex) {
            callback.invoke("Error", ex);
        }
    }

    @ReactMethod
    public void getModuleListAsync(Promise promise) {
        if (hasListening) {
            promise.resolve(getList());
        } else {
            promise.reject("Failure", "No Listener Attached");
        }
    }

    private void attachBasicListener() {
        handler.postDelayed(new Runnable() {
            public void run() {
                WritableMap params = Arguments.createMap();
                params.putString("date", currentDate());
                sendEvent(reactContext, "BASIC_LISTENER", params);
                handler.postDelayed(this, delay);
            }
        }, delay);
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    private String currentDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        return sdf.format(new Date());
    }


    private WritableArray getList() {
        WritableArray listArr = Arguments.createArray();

        listArr.pushString("This");
        listArr.pushString("is");
        listArr.pushString("Native");
        listArr.pushString("Module");

        return listArr;
    }
}