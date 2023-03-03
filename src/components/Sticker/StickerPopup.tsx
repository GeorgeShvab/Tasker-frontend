import ArrowBack from '@mui/icons-material/ArrowBack'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import useTheme from '@mui/material/styles/useTheme'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  ChangeEvent,
  FunctionComponent,
  useState,
  useRef,
  useEffect,
} from 'react'
import * as types from '../../../types'
import { useUpdateStickerMutation } from '../../api/stickerApiSlice'
import debounce from '../../utils/debounce'

const StikcerPopup: FunctionComponent<
  types.Sticker & { onBack?: () => void }
> = (props) => {
  const { _id, name, description, color, onBack } = props

  const { palette } = useTheme()

  const [updateSticker] = useUpdateStickerMutation()

  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  const isNotMobile = useMediaQuery('(min-width: 769px)')

  const [alertStatus, setAlertStatus] = useState<null | types.AlertStatus>(null)

  useEffect(() => {
    //for autofocus on the last charecter of field

    descriptionRef.current?.focus()

    descriptionRef.current?.setSelectionRange(
      descriptionRef.current?.value.length,
      descriptionRef.current?.value.length
    )
  }, [])

  let handleDescriptionInput: any = async (
    e: ChangeEvent<HTMLTextAreaElement>
  ): Promise<void> => {
    try {
      await updateSticker({
        description: e.target.value,
        id: _id,
        name,
        color,
      }).unwrap()
    } catch (e) {
      setAlertStatus({
        status: true,
        msg: "Не вдалось оновити нотатку, будь ласка, перевірте інтернет-з'єднання",
        type: 'error',
      })
    }
  }

  handleDescriptionInput = debounce(handleDescriptionInput, 2000)

  let handleNameInput: any = async (
    e: ChangeEvent<HTMLTextAreaElement>
  ): Promise<void> => {
    try {
      await updateSticker({
        name: e.target.value.replace(/\n/gi, ' ').trim(),
        id: _id,
        description,
        color,
      }).unwrap()
    } catch (e) {
      setAlertStatus({
        status: true,
        msg: "Не вдалось оновити нотатку, будь ласка, перевірте інтернет-з'єднання",
        type: 'error',
      })
    }
  }

  handleNameInput = debounce(handleNameInput, 2000)

  return (
    <>
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
        }}
        elevation={2}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            backgroundColor: color + '40',
            transition: 'background 0.15s',
          }}
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <Box
            sx={{
              '& *': {
                padding: '0 !important',
                border: 'none',
                outline: 'none',
              },
              padding: isNotMobile ? '15px 20px 12.5px' : '15px 15px 10px',
              paddingRight: onBack ? '55px' : undefined,
            }}
            position="relative"
          >
            <TextField
              defaultValue={name}
              spellCheck={false}
              inputProps={{
                style: {
                  fontSize: '18px',
                  lineHeight: '20px',
                  fontWeight: '800',
                },
                maxLength: 100,
              }}
              placeholder="Заголовок"
              onInput={handleNameInput}
              onSelectCapture={(e) => e.stopPropagation()}
              fullWidth
            />
            {onBack && (
              <IconButton
                sx={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  right: isNotMobile ? '17.5px' : '15px',
                  height: '30px',
                  width: '30px',
                }}
                onClick={onBack}
                size="large"
              >
                <ArrowBack />
              </IconButton>
            )}
          </Box>
          <Divider light />
          <Box overflow="hidden" borderRadius="0 0 3px 3px" height="100%">
            <Box
              paddingTop="10px"
              overflow="auto"
              height={'100%'}
              sx={{
                '& *': {
                  border: 'none',
                  outline: 'none',
                  minHeight: '100%',
                  padding: '0 !important',
                },

                padding: isNotMobile ? '17px 20px' : '15px 17.5px',
                ...(isNotMobile
                  ? {
                      '&::-webkit-scrollbar': {
                        width: '5px',
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: '#0000001a',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#0000000d',
                      },
                    }
                  : {}),
              }}
            >
              <TextField
                defaultValue={description}
                onInput={handleDescriptionInput}
                inputProps={{
                  maxLength: 3000,
                  style: {
                    minHeight: isNotMobile
                      ? 'calc(var(--full-height) - calc(var(--full-height) / 10) - 90px)'
                      : 'calc(var(--full-height) - calc(var(--full-height) / 5) - 85px)',
                    paddingBottom: '10px !important',
                    color: palette.grey[700],
                  },
                }}
                inputRef={descriptionRef}
                placeholder="Опис"
                multiline
                fullWidth
              />
            </Box>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={alertStatus?.status}
        autoHideDuration={5000}
        onClose={() =>
          setAlertStatus((prev) =>
            prev !== null ? { ...prev, status: false } : null
          )
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alertStatus?.type} sx={{ width: '100%' }}>
          {alertStatus?.msg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default StikcerPopup
