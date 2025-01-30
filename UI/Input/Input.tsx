import styles from './input.module.scss';

interface InputProps {
    label?: string;
    name: string;
    className: "standard" | "full" | "outline" | "uploadButton";
    flow: "flowRow" | "flowColumn";
    role?: "button" | "radio" | "checkbox";
    type?: "button" | "file";
    value?: string | number | string[];
    defaultValue?: string | number | string[];
    readOnly?: boolean;
    required?: boolean;
}

export default function Input({ label, name, className, flow, role, type, value, defaultValue, readOnly, required }: InputProps) {
    const CLASS_NAME = {
        input: styles.input,
        standard: styles.standard,
        full: styles.full,
        outline: styles.outlined,
        inputButton: styles.inputButton,
        flowColumn: styles[flow],
        flowRow: styles[flow],
        uploadButton: styles.uploadButton,
    }
    return (
        <div className={CLASS_NAME[flow]}>
            <label
                htmlFor={`${className}-${type}`}
                className={type === "file" ? CLASS_NAME[className] : styles.label}
            >
                {label}
            </label>
            <input
                id={`${className}-${type}`}
                name={name}
                className={CLASS_NAME[className]}
                role={role}
                type={type}
                value={value}
                defaultValue={defaultValue}
                readOnly={readOnly}
                required={required}
            />
        </div>
    )
}