package com.sap.bw.automation;

import org.eclipse.ui.plugin.AbstractUIPlugin;
import org.osgi.framework.BundleContext;

import com.sap.bw.automation.bridge.BridgeLoop;
import com.sap.bw.automation.core.StepJournal;

public final class Activator extends AbstractUIPlugin {
    public static final String PLUGIN_ID = "com.sap.bw.automation";
    private static Activator instance;
    private BridgeLoop bridge;

    @Override
    public void start(BundleContext context) throws Exception {
        super.start(context);
        instance = this;
        ensureBridgeStarted();
    }

    public synchronized void ensureBridgeStarted() {
        if (bridge != null) return;
        bridge = new BridgeLoop(new StepJournal());
        bridge.start();
    }

    @Override
    public void stop(BundleContext context) throws Exception {
        if (bridge != null) bridge.close();
        bridge = null;
        instance = null;
        super.stop(context);
    }

    public static Activator getDefault() {
        return instance;
    }
}
