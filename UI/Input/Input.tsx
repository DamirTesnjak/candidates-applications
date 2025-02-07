import styles from './input.module.scss';

interface InputProps {
    label?: string;
    name: string;
    className: "standard" | "full" | "outline" | "checkbox" | "uploadButton";
    flow: "flowRow" | "flowColumn";
    role?: "button" | "radio" | "checkbox";
    type: "button" | "file" | "text" | "checkbox" | "password" | "number" | "email" ;
    value?: string | number | string[];
    defaultValue?: string | number | string[];
    readOnly?: boolean;
    required?: boolean;
    checked?: string | number | boolean;
    errorMessage?: string | null;
}

export default function Input({
    label,
    name,
    className,
    flow,
    role,
    type,
    value,
    defaultValue,
    readOnly,
    required,
    checked,
    errorMessage }: InputProps) {
    const CLASS_NAME = {
        input: styles.input,
        standard: styles.standard,
        full: styles.full,
        outline: styles.outlined,
        inputButton: styles.inputButton,
        flowColumn: styles[flow],
        flowRow: styles[flow],
        uploadButton: styles.uploadButton,
        checkbox: styles.checkbox,
    }

    return (
        <div className={CLASS_NAME[flow]}>
            <label
                htmlFor={type === "file" ? `${className}-${type}` : name}
                className={type === "file" ? CLASS_NAME[className] : styles.label}
            >
                {label}
            </label>
            <input
                id={type === "file" ? `${className}-${type}` : name}
                name={name}
                className={CLASS_NAME[className]}
                role={role}
                type={type}
                value={value}
                defaultValue={defaultValue}
                readOnly={readOnly}
                required={required}
                defaultChecked={checked}
            />
            {errorMessage ? <div className={styles.errorMessage}>{errorMessage}</div> : null}
        </div>
    )
}