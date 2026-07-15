package com.sap.bw.automation.ui;

import java.util.EnumMap;
import java.util.Map;

import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableColumn;
import org.eclipse.swt.widgets.TableItem;
import org.eclipse.ui.part.ViewPart;

import com.sap.bw.automation.core.AutomationStep;
import com.sap.bw.automation.core.StepJournal;
import com.sap.bw.automation.core.VisualClass;

public final class AutomationView extends ViewPart {
    private final StepJournal journal = new StepJournal();
    private final Map<VisualClass, Color> colors = new EnumMap<>(VisualClass.class);
    private Table table;
    private boolean disposed;

    @Override
    public void createPartControl(Composite parent) {
        parent.setLayout(new GridLayout(1, false));
        Display display = parent.getDisplay();
        colors.put(VisualClass.BLUE, new Color(display, 225, 239, 255));
        colors.put(VisualClass.VIOLET, new Color(display, 238, 226, 255));
        colors.put(VisualClass.AMBER, new Color(display, 255, 241, 196));
        colors.put(VisualClass.DARK_RED, new Color(display, 137, 35, 48));
        colors.put(VisualClass.RED, new Color(display, 255, 214, 214));
        colors.put(VisualClass.GREEN, new Color(display, 218, 245, 224));

        Label banner = new Label(parent, SWT.WRAP);
        banner.setText("Passwords are never accepted by the automation.");
        banner.setBackground(colors.get(VisualClass.DARK_RED));
        banner.setForeground(display.getSystemColor(SWT.COLOR_WHITE));
        banner.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));

        Label login = new Label(parent, SWT.WRAP);
        login.setText("Enter credentials only in the native SAP login dialog. Password input is never recorded.");
        login.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));

        table = new Table(parent, SWT.FULL_SELECTION | SWT.BORDER | SWT.V_SCROLL | SWT.H_SCROLL);
        table.setHeaderVisible(true);
        table.setLinesVisible(true);
        table.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
        for (String title : new String[] { "Time", "Step", "Status", "Detail" }) {
            TableColumn column = new TableColumn(table, SWT.LEFT);
            column.setText(title);
            column.setWidth(title.equals("Detail") ? 360 : 145);
        }
        refresh();
    }

    private void refresh() {
        if (disposed || table == null || table.isDisposed()) return;
        table.removeAll();
        for (AutomationStep step : journal.readRecent(250)) {
            TableItem item = new TableItem(table, SWT.NONE);
            item.setText(new String[] { step.timestamp(), step.tool(), step.status(), step.message() });
            item.setBackground(colors.get(step.visualClass()));
            if (step.visualClass() == VisualClass.DARK_RED) item.setForeground(table.getDisplay().getSystemColor(SWT.COLOR_WHITE));
            if (step.sticky()) item.setFont(table.getDisplay().getSystemFont());
        }
        table.getDisplay().timerExec(1000, this::refresh);
    }

    @Override
    public void setFocus() {
        if (table != null) table.setFocus();
    }

    @Override
    public void dispose() {
        disposed = true;
        colors.values().forEach(Color::dispose);
        super.dispose();
    }
}
