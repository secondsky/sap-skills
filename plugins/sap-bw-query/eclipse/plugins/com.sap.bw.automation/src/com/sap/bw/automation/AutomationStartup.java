package com.sap.bw.automation;

import org.eclipse.swt.widgets.Display;
import org.eclipse.ui.IStartup;
import org.eclipse.ui.PlatformUI;

public final class AutomationStartup implements IStartup {
    @Override
    public void earlyStartup() {
        Activator activator = Activator.getDefault();
        if (activator != null) activator.ensureBridgeStarted();
        Display.getDefault().asyncExec(() -> {
            try {
                var window = PlatformUI.getWorkbench().getActiveWorkbenchWindow();
                if (window != null) window.getActivePage().showView("com.sap.bw.automation.view");
            } catch (Exception ignored) {
                // The view remains available through Window > Show View.
            }
        });
    }
}
