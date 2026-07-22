package com.sap.bw.automation;

import org.eclipse.core.runtime.Plugin;
import org.osgi.framework.BundleContext;

import com.sap.bw.automation.bridge.BridgeLoop;
import com.sap.bw.automation.core.StepJournal;

public final class Activator extends Plugin {
    public static final String PLUGIN_ID = "com.sap.bw.automation";
    // Set by headless entry points (e.g. the round-trip smoke application) so activating this
    // bundle never starts the interactive named-pipe bridge, which has no server in a
    // console/CI run and is unnecessary outside the workbench-hosted studio.
    public static final String HEADLESS_PROPERTY = "bw.automation.headless";
    private static Activator instance;
    private BridgeLoop bridge;

    @Override
    public void start(BundleContext context) throws Exception {
        super.start(context);
        instance = this;
        if (!isHeadless()) ensureBridgeStarted();
    }

    private static boolean isHeadless() {
        return Boolean.getBoolean(HEADLESS_PROPERTY);
    }

    public synchronized void ensureBridgeStarted() {
        if (isHeadless() || bridge != null) return;
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
