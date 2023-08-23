import boto3
import botocore
import os
import uuid


s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_ACCESS_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET_ACCESS_KEY")
)


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


ALLOWED_EXTENSIONS_PHOTO = {"pdf", "png", "jpg", "jpeg", "gif"} # maybe also {"apng", "avif", "jfif", "pjpeg", "pjp", "svg", "webp"}
BUCKET_NAME_PHOTO = os.environ.get("S3_BUCKET_COURSE_PHOTOS")
S3_LOCATION_PHOTO = f"https://{BUCKET_NAME_PHOTO}.s3.amazonaws.com/"

def upload_photo_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME_PHOTO,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION_PHOTO}{file.filename}"}

def remove_image_file_from_s3(image_url):
    # Split image name out of the URL
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME_PHOTO,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True


ALLOWED_EXTENSIONS_VIDEO = {"mp4", "avi", "ogv", "webm"} # maybe also {"ogm", "ogg"}
BUCKET_NAME_VIDEO = os.environ.get("S3_BUCKET_COURSE_VIDEOS")
S3_LOCATION_VIDEO = f"https://{BUCKET_NAME_VIDEO}.s3.amazonaws.com/"

def upload_video_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME_VIDEO,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION_VIDEO}{file.filename}"}

def remove_video_file_from_s3(video_url):
    # Split video name out of the URL
    key = video_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME_VIDEO,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True
