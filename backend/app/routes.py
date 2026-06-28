import time

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Form
from fastapi.responses import JSONResponse

from app.services.image_service import process_image
from app.services.audio_service import process_audio
from app.schemas import ProcessResponse
from app.utils import save_temp_file
from app.services.validator import detect_media
from app.services.validator import validate_size

router = APIRouter()


@router.post("/process", response_model=ProcessResponse)
async def process_file(
    file: UploadFile = File(...),
    mode: str = Form(...),
    message: str = Form(None)
):

    try:

        start = time.time()

        content = await file.read()

        media_type = detect_media(file.filename)

        validate_size(media_type, len(content))

        temp_path = save_temp_file(file.filename, content)

        if media_type == "image":

            result = process_image(temp_path, mode, message)

            return ProcessResponse(
                status=result["status"],
                media_type=result["media_type"],
                original_size=result["original_size"],
                processed_size=result["processed_size"],
                compression_ratio=result["compression_ratio"],
                processing_time_ms=result["processing_time_ms"],
                message=result["message"]
            )
        
        elif media_type == "audio":

            result = process_audio(
                temp_path,
                mode,
                message
            )

            return ProcessResponse(
                status=result["status"],
                media_type=result["media_type"],
                original_size=result["original_size"],
                processed_size=result["processed_size"],
                compression_ratio=result["compression_ratio"],
                processing_time_ms=result["processing_time_ms"],
                message=result["message"]
            )

        elapsed = int((time.time() - start) * 1000)


        return ProcessResponse(
            status="success",
            media_type=media_type,
            original_size=len(content),
            processed_size=len(content),
            compression_ratio=0,
            processing_time_ms=elapsed,
            message="Processing not implemented yet"
        )

    except NotImplementedError:

        elapsed = int((time.time() - start) * 1000)

        return ProcessResponse(
            status="success",
            media_type=media_type,
            original_size=len(content),
            processed_size=len(content),
            compression_ratio=0,
            processing_time_ms=elapsed,
            message="Processing not implemented yet"
        )

    except ValueError as e:

        return JSONResponse(
            status_code=400,
            content={
                "status": "error",
                "message": str(e)
            }
        )

    except Exception as e:

        print(f"[ERROR] {e}")

        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "message": "Processing failed"
            }
        )