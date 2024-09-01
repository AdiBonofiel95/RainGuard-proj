from flask import request
import os
import logging
from logging.handlers import TimedRotatingFileHandler

FORMAT = '%(asctime)s - %(levelname)s - %(message)s'
    
    # most logger logic taken from chat_gpt

def setup_logger():
    if not os.path.exists('./server/logs'):
        os.makedirs('./server/logs')
    log_handler = TimedRotatingFileHandler('./server/logs/server_log.log', when='midnight', interval=1)
    log_handler.suffix = "%Y-%m-%d"  # Add date suffix to the log file
    log_handler.setLevel(logging.INFO)
    log_handler.setFormatter(logging.Formatter(FORMAT))
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(FORMAT)
    logger = logging.getLogger()
    logging.getLogger().setLevel(logging.INFO)
    logging.getLogger().addHandler(log_handler)
    logger.addHandler(console_handler)

    return logger
