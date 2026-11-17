import asyncio
import logging
from aiogram import Bot, Dispatcher, F, types
from aiogram.filters import Command
from aiogram.utils.keyboard import ReplyKeyboardBuilder, InlineKeyboardBuilder

# --- SOZLAMALAR ---
TELEGRAM_TOKEN = "9251047246:AAFGFMOpS7IrANmZvnqReCQzXeJnpxOh3_c"

# Loggingni yoqish
logging.basicConfig(level=logging.INFO)

# Botni ishga tushirish
bot = Bot(token=TELEGRAM_TOKEN)
dp = Dispatcher()

# Asosiy menyu tugmalari (Reply Keyboard)
def get_main_keyboard():
    builder = ReplyKeyboardBuilder()
    builder.button(text="🛍 Mahsulotlar")
    builder.button(text="🌐 Veb-sayt")
    builder.button(text="📞 Biz bilan bog'lanish")
    builder.button(text="ℹ️ Ma'lumot")
    builder.adjust(2, 2) # Tugmalarni 2 tadan qilib joylashtirish
    return builder.as_markup(resize_keyboard=True)

# /start buyrug'i uchun
@dp.message(Command("start"))
async def start_command(message: types.Message):
    user_name = message.from_user.first_name
    await message.answer(
        f"Assalomu alaykum, **{user_name}**! 🚀\n\n"
        f"NexusDigital raqamli mahsulotlar va xizmatlar botiga xush kelibsiz. "
        f"Quyidagi tugmalar yordamida kerakli bo'limni tanlang:",
        reply_markup=get_main_keyboard()
    )

# "Veb-sayt" tugmasi bosilganda
@dp.message(F.text == "🌐 Veb-sayt")
async def website_handler(message: types.Message):
    builder = InlineKeyboardBuilder()
    # Bu yerga o'z veb-saytingiz havolasini qo'yasiz
    builder.button(text="🔗 NexusDigital-ni ochish", url="https://nexusdigital.uz")
    
    await message.answer(
        "🌐 Bizning rasmiy veb-saytimizga o'tish uchun quyidagi tugmani bosing:",
        reply_markup=builder.as_markup()
    )

# "Mahsulotlar" tugmasi bosilganda
@dp.message(F.text == "🛍 Mahsulotlar")
async def products_handler(message: types.Message):
    await message.answer(
        "🛍 **NexusDigital Raqamli Bozori:**\n\n"
        "1. Telegram Botlar va Avtomatlashtirish\n"
        "2. Professional Veb-saytlar va Landing page\n"
        "3. Sun'iy intellekt integratsiyalari\n\n"
        "Buyurtma berish uchun administratorga yozing!"
    )

# "Biz bilan bog'lanish" tugmasi bosilganda
@dp.message(F.text == "📞 Biz bilan bog'lanish")
async def contact_handler(message: types.Message):
    builder = InlineKeyboardBuilder()
    builder.button(text="✍️ Administratorga yozish", url="https://t.me/Abdushukur_Admin") # O'z telegram linkingizni qo'ying
    
    await message.answer(
        "📞 Savollar yoki hamkorlik uchun biz bilan bog'laning:",
        reply_markup=builder.as_markup()
    )

# "Ma'lumot" tugmasi bosilganda
@dp.message(F.text == "ℹ️ Ma'lumot")
async def info_handler(message: types.Message):
    await message.answer(
        "ℹ️ **NexusDigital** — bu zamonaviy raqamli xizmatlar va mahsulotlarni taqdim etuvchi platforma. Biz biznesingizni avtomatlashtirishga yordam beramiz!"
    )

# Boshqa matnli xabarlar uchun
@dp.message(F.text)
async def echo_handler(message: types.Message):
    await message.answer(
        f"Sizning xabaringiz qabul qilindi! Iltimos, kerakli bo'limni tanlash uchun pastdagi tugmalardan foydalaning.",
        reply_markup=get_main_keyboard()
    )

# Botni ishga tushiruvchi asosiy funksiya
async def main():
    print("NexusDigital boti tugmalar bilan birga muvaffaqiyatli ishga tushdi!")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())