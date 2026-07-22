package com.sap.bw.automation.ui;

import org.eclipse.jface.dialogs.IDialogConstants;
import org.eclipse.jface.dialogs.TitleAreaDialog;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;

import com.google.gson.JsonObject;

public final class NewQueryConfirmationDialog extends TitleAreaDialog {
    private final JsonObject binding;
    private boolean confirmed;

    public NewQueryConfirmationDialog(Shell parentShell, JsonObject binding) {
        super(parentShell);
        this.binding = binding;
    }

    @Override
    public void create() {
        super.create();
        setTitle("Prepare a brand-new BW query");
        setMessage("This does not save automatically. Confirm the exact target, then finish the native SAP wizard yourself.");
        getButton(IDialogConstants.OK_ID).setEnabled(false);
    }

    @Override
    protected Control createDialogArea(Composite parent) {
        Composite area = (Composite) super.createDialogArea(parent);
        Composite body = new Composite(area, SWT.NONE);
        body.setLayout(new GridLayout(2, false));
        body.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
        addRow(body, "System / client", value("system") + " / " + value("client"));
        addRow(body, "Provider", value("provider"));
        addRow(body, "New technical name", value("technicalName"));
        addRow(body, "Specification SHA-256", value("specHash"));
        Button check = new Button(body, SWT.CHECK);
        check.setText("I confirm this is a new query. Existing queries must never be overwritten or modified.");
        check.setLayoutData(new GridData(SWT.LEFT, SWT.CENTER, true, false, 2, 1));
        check.addListener(SWT.Selection, event -> getButton(IDialogConstants.OK_ID).setEnabled(check.getSelection()));
        return area;
    }

    @Override
    protected void okPressed() {
        confirmed = true;
        super.okPressed();
    }

    public boolean requiresEclipseHumanConfirmation() {
        return confirmed;
    }

    private String value(String name) {
        return binding.has(name) ? binding.get(name).getAsString() : "";
    }

    private static void addRow(Composite parent, String label, String value) {
        new Label(parent, SWT.NONE).setText(label);
        Label text = new Label(parent, SWT.WRAP);
        text.setText(value);
        text.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));
    }
}
