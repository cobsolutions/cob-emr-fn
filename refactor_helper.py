#!/usr/bin/env python3
"""
Helper script to extract sections from the massive mapHeadNeckMuscles1 method
"""

import re

# Read the file
file_path = r"C:\cob\emr\emr-fn\projects\emr-application\src\app\modules\patient\components\medical.note\components\objective\palpationN\service\palpation-mapper.service.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Extract lines 49-633 (the content of mapHeadNeckMuscles1 method body, excluding the method signature and closing brace)
method_content = lines[48:632]  # 0-indexed, so line 49 is index 48, line 632 is index 631

# Define sections based on muscle groups
sections = {
    'headNeckMuscles1': (0, 49),  # temporalis, masseter, scm, scalenes (lines 49-97)
    'headNeckMuscles2': (49, 92),  # suboccipital, levator scapula, upper trapezius (lines 98-139)
    'upperBodyMuscles1': (92, 141),  # middle/lower trapezius, quadratus, SI joint, sacral multifidii, ASIS, PSIS, ischial tuberosity, pubic symphysis (lines 140-288)
    'upperBodyMuscles2': (141, 257),  # rotator cuff (lines 289-304)
    'lowerBodyMuscles1': (257, 400),  # piriformis, gluteus, tensor, hip flexors, thigh muscles
    'lowerBodyMuscles2': (400, 500),  # leg muscles
    'footAnkleMuscles': (500, len(method_content))  # foot/ankle, sesamoids, MTPs
}

print("Total lines in method body:", len(method_content))
print("\nFirst few lines:")
for i in range(min(5, len(method_content))):
    print(f"  {i}: {method_content[i].rstrip()}")

# Find key markers
markers = []
for i, line in enumerate(method_content):
    line_text = line.strip()
    if any(keyword in line_text for keyword in ['right_temporalis', 'right_suboccipital', 'right_middle_trapezius',
                                                   'right_rotator_cuff_insertion_at_greater_tubercle',
                                                   'right_piriformis_normal',
                                                   'right_gluteus_maximus',
                                                   'right_tensor_fascia',
                                                   'achilles_tendon_normal',
                                                   'sesamoids_normal']):
        markers.append((i, line_text[:80]))

print("\nKey markers found:")
for idx, text in markers[:20]:
    print(f"  Line {idx + 49}: {text}")
