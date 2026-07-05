import styles from './Field.module.css'

const Field = (props) => {
    const{
        className = '',
        id,
        lable,
        type = 'text',
        value,
        error,
        onInput,
        ref,
    } = props

    return(
        <div className={`${styles.field} ${className}`}>
            <label
                className={styles.label}
                htmlFor="{id}"
            >
                {lable}
            </label>
            <input
                className={`${styles.input} ${error ? styles.isInvalid : ''}`}
                id="{id}"
                placeholder=" "
                autoComplete="off"
                type={type}
                value={value}
                onInput = {onInput}
                ref = {ref}
            />
            {error && (
                <span className={`${styles.error}`} title={error}>{error}</span>
            )}
        </div>
    )
}

export default Field