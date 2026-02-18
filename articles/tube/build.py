import os
from pathlib import Path
from PIL import Image
import fitz  # PyMuPDF

# =========================
# Configuração
# =========================

IMG_DIR = Path("img")
IMG_THUMB_DIR = IMG_DIR / "thumb"

PDF_DIR = Path("pdf")
PDF_THUMB_DIR = PDF_DIR / "thumb"

THUMB_SIZE = (300, 300)

TEMPLATE_FILE = "template.html"
OUTPUT_HTML = "index.html"

SUPPORTED_IMAGES = (".jpg",".gif",".jpeg",".jfif",".png",".webp",".bmp")

# =========================
# Utilidades
# =========================

def ensure_dirs():
    IMG_THUMB_DIR.mkdir(parents=True, exist_ok=True)
    PDF_THUMB_DIR.mkdir(parents=True, exist_ok=True)


def generate_img_thumb(src, dst):
    with Image.open(src) as img:
        img.thumbnail(THUMB_SIZE)
        img.convert("RGB").save(dst, "JPEG")


def generate_pdf_thumb(pdf_path, thumb_path):
    doc = fitz.open(pdf_path)
    page = doc.load_page(0)

    zoom = 2.0
    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat)

    img = Image.frombytes(
        "RGB",
        (pix.width, pix.height),
        pix.samples
    )

    img.thumbnail(THUMB_SIZE)
    img.save(thumb_path, "JPEG")

    doc.close()


# =========================
# Coleta de arquivos
# =========================

def collect_items():
    items = []

    # Imagens
    for file in sorted(IMG_DIR.iterdir()):
        if file.suffix.lower() in SUPPORTED_IMAGES:
            thumb = IMG_THUMB_DIR / (file.stem + ".jpg")

            if not thumb.exists():
                generate_img_thumb(file, thumb)

            items.append({
                "type": "image",
                "src": file.as_posix(),
                "thumb": thumb.as_posix(),
                "name": file.name
            })

    # PDFs
    for file in sorted(PDF_DIR.iterdir()):
        if file.suffix.lower() == ".pdf":
            thumb = PDF_THUMB_DIR / (file.stem + ".jpg")

            if not thumb.exists():
                generate_pdf_thumb(file, thumb)

            items.append({
                "type": "pdf",
                "src": file.as_posix(),
                "thumb": thumb.as_posix(),
                "name": file.name
            })

    return items


# =========================
# HTML Rendering
# =========================

def render_items(items):
    html = ""

    for item in items:
        html += f"""
<div class="item">
    <a href="{item['src']}" target="_blank">
        <img src="{item['thumb']}">
        <span>{item['name']}</span>
    </a>
</div>
"""
    return html.strip()


def generate_html(items):
    with open(TEMPLATE_FILE, "r", encoding="utf-8") as f:
        template = f.read()

    gallery_html = render_items(items)
    final_html = template.replace("{{GALLERY_ITEMS}}", gallery_html)

    with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
        f.write(final_html)


# =========================
# Main
# =========================

def main():
    ensure_dirs()
    items = collect_items()
    generate_html(items)
    print("✔ Galeria gerada com sucesso.")


if __name__ == "__main__":
    main()
