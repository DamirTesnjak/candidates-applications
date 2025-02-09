import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function InputFileUpload({text, className}: {text: string, className?: string}) {
    return (
        <Button
            className={className}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            {text}
            <Input
                sx={{
                    clip: 'rect(0 0 0 0)',
                    clipPath: 'inset(50%)',
                    height: 1,
                    overflow: 'hidden',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    whiteSpace: 'nowrap',
                    width: 1,
                }}
                id="upload"
                type="file"
                onChange={() => console.log('file selected')}
            />
        </Button>
    );
}